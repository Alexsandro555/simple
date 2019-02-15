<template>
  <v-flex xs12 class="text-xs-center">
    <v-card>
      <v-card-title>
        <h2>Торговые предложения</h2>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Поиск" single-line hide-details></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="productSkus" :search="search" :loading="loading"
                      :rows-per-page-items="[10, 20, 50, { 'text': '$vuetify.dataIterator.rowsPerPageAll', 'value': -1 } ]"
                      rows-per-page-text="Строк на странице:"
                      class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.sku }}</td>
            <td class="text-xs-left">{{ props.item.price }}</td>
            <td class="justify-center layout px-0">
              <!--<v-btn @click="goToPage(props.item)" icon class="mx-0">
                <v-icon>find_in_page</v-icon>
              </v-btn>-->
              <v-btn icon class="mx-0" @click="onEdit(props.item.id)">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <!--<v-btn :disabled="props.item.url_key === 'po-umolchaniyu'" icon class="mx-0"
                     @click="deleteItem(props.item)">
                <v-icon color="pink">delete</v-icon>
              </v-btn>-->
            </td>
          </template>
          <template v-if="loading" slot="no-data">
            <br>
            <v-progress-circular indeterminate :size="100" color="primary"></v-progress-circular>
            <br>
            <br>
          </template>
          <template v-if="!loading" slot="no-data">
            <v-alert :value="true" color="error" icon="warning">
              Извините, нет данных для отображения :(
            </v-alert>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            По ключевой фразе "{{ search }}" ничего не найдено.
          </v-alert>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="addSku" color="primary" dark class="text-left mb-2">
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Добавление торгового предложения</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md12>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    name="price"
                    label="Цена"
                    v-model="sku.price"
                    :counter="13"
                    :rules="getRules({max: 13})"
                    prefix="₽"
                    :error-messages="messages.price">
                  </v-text-field>
                  <span v-for="item in skuAttributes" :key="item.id">
                      <v-select v-if="item.attribute_type_id==6"
                        :name="item.alias"
                        :items="item.attribute_list_value"
                        :label="item.title"
                        item-text="title"
                        item-value="id"
                        no-data-text="Нет данных"
                        required
                        v-model="item.value"
                        single-line>
                      </v-select>
                  </span>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Отмена</v-btn>
          <v-btn color="blue darken-1" @click="onSave" flat :disabled="loading" type="submit">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>
<script>
  import {GLOBAL} from "@/constants";
  import {ACTIONS} from "@product/constants"
  import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'
  import {ValidationConvert} from '@/vue/Validations'

  export default {
    props: {
      id: {
        type: Number,
        required: true
      },
      attributes: {
        type: Array,
        default: []
      }
    },
    data: function () {
      return {
        headers: [
          {
            text: '#',
            align: 'left',
            sortable: true,
            value: 'id'
          },
          {
            text: 'SKU',
            value: 'title',
            sortable: true
          },
          {
            text: 'Цена',
            value: 'price',
            sortable: true
          },
          {
            text: 'Действия',
            value: 'title',
            sortable: false
          }
        ],
        sku: {},
        attrs: {},
        search: '',
        loader: true,
        dialog: false,
        validationConvert: new ValidationConvert(),
        valid: false,
        skuAttributes: [...this.attributes],
        editedIndex: -1
      }
    },
    computed: {
      ...mapState('Sku', ['items', 'loading']),
      ...mapState('SkuOptions', {skyOptions: 'items'}),
      ...mapState('initializer', ['messages']),
      ...mapGetters('Sku', {getSku: GLOBAL.GET_ITEM}),
      ...mapGetters('SkuOptions', {transformByKey: GLOBAL.TRANSFORM_BY_KEY}),
      productSkus() {
        return this.items.filter(item => item.product_id === this.id)
      }
    },
    methods: {
      addSku() {
        this.editedIndex = -1
        this.dialog = true
      },
      deleteItem(item) {
        if (confirm('Вы уверены что хотите удалить запись?')) {
          this.delete(item.id)
        }
      },
      getRules(validations) {
        return validations ? this.validationConvert.ruleValidations(validations) : []
      },
      close() {
        this.resetError()
        this.dialog = false
        this.$refs.form.reset()
      },
      onSave() {
        if (this.$refs.form.validate()) {
          this.isSending = true
          if(this.editedIndex == -1) {
            this.addNewSku(Object.assign(this.sku, {'product_id': this.id})).then(response => {
              let attributes = this.skuAttributes.map(item => {
                return item.value ? {
                  'id': null,
                  'sku_id': response.id,
                  'attribute_id': item.id,
                  'attribute_list_value_id': item.value
                } : null
              }).filter(item => item !== null)
              this.addNewSkyOption(attributes).then(response => {
                this.isSending = false
                this.$refs.form.reset()
                this.dialog = false
              })
            })
          }
          else {
            this.saveSku(this.sku).then(response => {
              let attributes = this.skuAttributes.map(item => {
                return item.value ? {
                  'id': item.rel_id,
                  'sku_id': response.id,
                  'attribute_id': item.id,
                  'attribute_list_value_id': item.value
                } : null
              }).filter(item => item !== null)
              this.saveSkuOption(attributes).then(response => {
                this.isSending = false
                this.$refs.form.reset()
                this.dialog = false
              })
            })
          }
        }
      },
      onEdit(id) {
        this.editedIndex = id
        this.sku = Object.assign({}, this.getSku(id))
        let options = this.skyOptions.filter(item => item.sku_id == id)
        let attributes = [...this.attributes]
        attributes.forEach(item => {
          let option = options.find(element => element.attribute_id == item.id)
          if (option) {
            item.value = option.attribute_list_value_id
            item.rel_id = option.id
          }
        })
        this.skuAttributes = [...this.attributes]
        this.dialog = true
      },
      ...mapMutations('initializer', {resetError: 'RESET_ERROR'}),
      ...mapActions('Sku', {
        addNewSku: GLOBAL.ADD,
        saveSku: GLOBAL.SAVE_DATA,
        delete: GLOBAL.DELETE
      }),
      ...mapActions('SkuOptions', {
        addNewSkyOption: GLOBAL.ADD,
        saveSkuOption: GLOBAL.SAVE_DATA
      })
    }
  }
</script>