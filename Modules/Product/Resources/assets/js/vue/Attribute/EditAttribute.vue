<template>
  <v-container>
    <v-layout wrap row>
      <v-progress-circular v-if="loader" indeterminate :size="100" color="primary"></v-progress-circular>
      <v-flex v-if="!loader">
        <v-card>
          <v-card-title>
            <h1>Редактирование {{form.title}}</h1>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
                <v-flex>
                  <v-form ref="form" lazy-validation v-model="valid">
                    <template v-for="(field, num) in fields">
                      <form-builder :field="field" v-if="num!=='description'" :num="num" :items="form" @update="updateField">
                      </form-builder>
                    </template>
                    <v-flex text-xs-left>
                      <v-btn large :class="{primary: valid, 'red lighten-3': !valid}" :disabled="isSending"
                             @click.prevent="onSubmit">Сохранить
                      </v-btn>
                    </v-flex>
                  </v-form>
                  <br>
                  <div v-if="form.attribute_type_id == 6">
                    <template>
                      <v-data-table :headers="headers" :items="getAttributeListValues" class="elevation-1">
                        <template slot="items" slot-scope="props">
                          <td>{{ props.item.title}}</td>
                        </template>
                      </v-data-table>
                    </template>
                    <br>
                    <v-form ref="formList" lazy-validation v-model="validList">
                      <v-layout row wrap>
                        <v-text-field
                          name="title"
                          label="Значение списка"
                          v-model="titleList"
                          :counter="255"
                          :rules="[v => !!v || 'Обязательно для заполнения',v => v && v.length <=255 || 'Наименование должно иметь длину не более 255 символов']"
                          :error-messages="messages.titleList"
                          required></v-text-field>
                          <v-btn large :class="{primary: validList, 'red lighten-3': !validList}" :disabled="isSending" @click.prevent="onSaveListVal">Добавить</v-btn>
                      </v-layout>
                    </v-form>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import {mapActions, mapState, mapMutations, mapGetters} from 'vuex'
  import {ACTIONS, GLOBAL} from '@/constants'
  import formBuilder from '@/vue/FormBuilder'
  export default {
    props: {
      id: {
        type: String,
        required: true
      },
    },
    data: function () {
      return {
        valid: false,
        validList: false,
        loader: true,
        isSending: false,
        titleList: '',
        headers: [
          {
            text: 'Наименование',
            align: 'left',
            sortable: true,
            value: 'title'
          },
          {
            text: 'Сорт.',
            align: 'right',
            sortable: true,
            value: 'sort'
          }
        ],
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.init(to.params.id)
        vm.loader = false
      })
    },
    beforeRouteUpdate(to, from, next) {
      this.init(to.params.id)
      this.loader = false
      next()
    },
    computed: {
      ...mapState('Attribute', ['items', 'fields', 'model']),
      ...mapState('AttributeListValue', {attributesListValues: 'items'}),
      ...mapState('initializer', ['messages']),
      ...mapGetters('Attribute', {getItem: GLOBAL.GET_ITEM}),
      form() {
        return Object.assign({}, this.getItem(Number(this.id)))
      },
      getAttributeListValues() {
        return this.attributesListValues.filter(attributeListValues =>
          attributeListValues.attribute_id === Number(this.id)
        )
      }
    },
    components: {
      formBuilder,
    },
    methods: {
      ...mapActions('Attribute', {
        save: GLOBAL.SAVE_DATA,
      }),
      ...mapActions('AttributeListValue', {add: GLOBAL.SAVE_DATA}),
      ...mapMutations('initializer', {resetError: 'RESET_ERROR'}),
      updateField(objField) {
        Object.assign(this.form, objField)
      },
      init(id) {
        this.resetError();
        if (this.items.length == 0) {
          this.$router.push({name: 'product-attributes-list'})
        }
      },
      onSubmit() {
        if (this.$refs.form.validate()) {
          const data = _.pick(this.form, ['id','title', 'sort', 'active', 'attribute_type_id', 'attribute_group_id', 'attribute_unit_id'])
          this.isSending = true
          this.save(data).then(response => {
            this.isSending = false
            this.resetError()
          })
        }
      },
      onSaveListVal() {
        if (this.$refs.formList.validate()) {
          this.isSending = true
          this.add({'attribute_id': Number(this.id), 'title': this.titleList}).then(response => {
            this.isSending = false
            this.titleList = ''
          })
        }
      }
    }
  }
</script>