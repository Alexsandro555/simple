<template>
  <v-container>
    <v-layout wrap row>
      <v-flex>
        <v-progress-circular v-if="loader" indeterminate :size="100" color="primary"></v-progress-circular>
        <v-card v-else>
          <v-card-title>
            <h1>Привязка атрибутов</h1>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation v-model="validRemainAttr">
              <v-select
                name="product_category_id"
                :items="productCategories"
                label="Категория продукта"
                item-text="title"
                @change="changeProductCategories"
                item-value="id"
                :rules="getRules({required: true})"
                required
                :error-messages="messages.product_category_id"
                v-model="form.product_category_id"
                single-line>
              </v-select>
              <v-select
                name="type_product_id"
                :items="getTypeProducts"
                label="Типы продукта"
                item-text="title"
                no-data-text="Нет данных"
                @change="changeTypeProducts"
                item-value="id"
                v-model="form.type_product_id"
                single-line>
              </v-select>
              <v-select
                name="line_product_id"
                :items="getLineProducts"
                label="Линейки продукции"
                item-text="title"
                no-data-text="Нет данных"
                item-value="id"
                v-model="form.line_product_id"
                single-line>
              </v-select>
              <v-select
                label="Атрибуты"
                :items="getRemainsAttributes"
                v-model="form.selectedRemainAttr"
                multiple
                :menu-props="{maxHeight: '400'}"
                item-text="title"
                item-value="id"
                no-data-text="Нет данных"
                persistent-hint
                chips
                :rules="getRules({selected: true})"
                required>
                <template slot="selection" slot-scope="data">
                  <v-chip
                    close
                    @input="data.parent.selectItem(data.item)"
                    :selected="data.selected"
                    class="chip--select-multi"
                    :key="JSON.stringify(data.item)">
                    {{ data.item.title }}
                  </v-chip>
                </template>
              </v-select>
              <v-btn large color="primary" :disabled="!validRemainAttr || isSending" @click.prevent="onSaveAttributes()">Сохранить
              </v-btn>
            </v-form>
            <v-form ref="formProductCategoryAttr" lazy-validation v-model="validProdCatAttr">
              <v-select
                label="Атрибуты категории продукции"
                :items="getProductCategoryAttributes"
                v-model="formProductCategoryAttributes"
                multiple
                :menu-props="{maxHeight: '400'}"
                item-text="title"
                item-value="id"
                no-data-text="Нет данных"
                attach
                chips
                :rules="[v => (v && v.length>0) || 'Необходимо выбрать значение']"
                required>
                <template slot="selection" slot-scope="data">
                  <v-chip
                    close
                    @input="data.parent.selectItem(data.item)"
                    :selected="data.selected"
                    class="chip--select-multi"
                    :key="JSON.stringify(data.item)">
                    {{ data.item.title }}
                  </v-chip>
                </template>
              </v-select>
              <v-btn large color="primary" :disabled="!validProdCatAttr" @click.prevent="onRemoveProductCategoryAttributes">Исключить атрибуты</v-btn>
            </v-form>
            <v-form ref="formTypeProdAttr" lazy-validation v-model="validTypeProdAttr">
              <v-select
                label="Атрибуты типа продукции"
                :items="getTypeProductAttributes"
                v-model="formTypeProductAttributes"
                multiple
                :menu-props="{maxHeight: '400'}"
                item-text="title"
                item-value="id"
                no-data-text="Нет данных"
                persistent-hint
                chips
                :rules="[v => (v && v.length>0) || 'Необходимо выбрать значение']"
                required>
                <template slot="selection" slot-scope="data">
                  <v-chip
                    close
                    @input="data.parent.selectItem(data.item)"
                    :selected="data.selected"
                    class="chip--select-multi"
                    :key="JSON.stringify(data.item)">
                    {{ data.item.title }}
                  </v-chip>
                </template>
              </v-select>
              <v-btn large color="primary" :disabled="!validTypeProdAttr" @click.prevent="onRemoveTypeProductAttributes">Исключить атрибуты</v-btn>
            </v-form>
            <v-form ref="formLineProdAttr" lazy-validation v-model="validLineProdAttr">
              <v-select
                label="Атрибуты линейки продукции"
                :items="getLineProductAttributes"
                v-model="formLineProductAttributes"
                multiple
                :menu-props="{maxHeight: '400'}"
                item-text="title"
                item-value="id"
                no-data-text="Нет данных"
                persistent-hint
                chips
                :rules="getRules({selected: true})"
                required>
                <template slot="selection" slot-scope="data">
                  <v-chip
                    close
                    @input="data.parent.selectItem(data.item)"
                    :selected="data.selected"
                    class="chip--select-multi"
                    :key="JSON.stringify(data.item)">
                    {{ data.item.title }}
                  </v-chip>
                </template>
              </v-select>
              <v-btn large color="primary" :disabled="!validLineProdAttr" @click.prevent="onRemoveLineProductAttributes">Исключить атрибуты</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {ACTIONS} from "@product/constants"
  import {mapState, mapActions} from "vuex"
  import {ValidationConvert} from '@/vue/Validations'

  export default {
    data() {
      return {
        loader: false,
        validationConvert: new ValidationConvert(),
        form: {
          product_category_id: null,
          type_product_id: null,
          line_product_id: null,
          selectedRemainAttr: null
        },
        // ProductCategory
        validProdCatAttr: false,
        formProductCategoryAttributes: null,
        //selectedAttrProductCategory: null,
        // TypeProduct
        validTypeProdAttr: false,
        formTypeProductAttributes: null,
        //selectedAttrTypeProduct: null,
        // LineProduct
        validLineProdAttr: false,
        formLineProductAttributes: null,
        // RemainAttr
        validRemainAttr: false,
        isSending: false

      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.load().then(response => {
          vm.loader = false
        })
      })
    },
    computed: {
      ...mapState('ProductCategory', {productCategories: state => state.items}),
      ...mapState('TypeProduct', {typeProducts: state => state.items}),
      ...mapState('LineProduct', {lineProducts: state => state.items}),
      ...mapState('Attribute', {attributes: state => state.bindAttributes, allAttributes: state => state.items}),
      getTypeProducts() {
        return this.typeProducts ? this.typeProducts.filter(typeProduct => typeProduct.product_category_id === this.form.product_category_id) : []
      },
      getLineProducts() {
        return this.lineProducts.filter(lineProduct => lineProduct.type_product_id === this.form.type_product_id)
      },
      getProductCategoryAttributes() {
        return this.form.product_category_id?this.attributes.filter(attribute => attribute.product_categories.find(productCategory => productCategory.id === this.form.product_category_id)):[]
      },
      getTypeProductAttributes() {
        return this.form.type_product_id?this.attributes.filter(attribute => attribute.type_products.find(typeProduct => typeProduct.id === this.form.type_product_id)):[]
      },
      getLineProductAttributes() {
        return this.form.line_product_id?this.attributes.filter(attribute => attribute.line_products.find(lineProduct => lineProduct.id === this.form.line_product_id)):[]
      },
      getSelAttributesIds() {
        return this.getProductCategoryAttributes.concat(this.getTypeProductAttributes).concat(this.getLineProductAttributes).map(item => item.id)
      },
      getRemainsAttributes() {
        return this.allAttributes.filter(allAttribute => !this.getSelAttributesIds.includes(allAttribute.id))
      }
    },
    watch: {
      getProductCategoryAttributes(val) {
        this.formProductCategoryAttributes = [...val]
      },
      getTypeProductAttributes(val) {
        this.formTypeProductAttributes = [...val]
      },
      getLineProductAttributes(val) {
        this.formLineProductAttributes = [...val]
      }
    },
    methods: {
      ...mapState('initializer', ['messages']),
      changeProductCategories() {
        this.form.type_product_id = null
        this.form.line_product_id = null
      },
      changeTypeProducts() {
        this.form.line_product_id = null
      },
      onSaveAttributes() {
        if (this.$refs.form.validate()) {
          this.isSending = true
          this.save(this.form).then(response => {
            this.isSending = false
            document.location.reload(true)
          })
        }
      },
      onRemoveProductCategoryAttributes() {
        if (this.$refs.formProductCategoryAttr.validate()) {
          this.isSending = true
          let data = {
            'attr': this.formProductCategoryAttributes,
            'product_category_id': this.form.product_category_id
          }
          this.removeBindAttributes(data).then(response => {
            this.isSending = false
            document.location.reload(true)
          })
        }
      },
      onRemoveTypeProductAttributes() {
        if (this.$refs.formTypeProdAttr.validate()) {
          this.isSending = true
          let data = {
            'attr': this.formTypeProductAttributes,
            'type_product_id': this.form.type_product_id
          }
          this.removeBindAttributes(data).then(response => {
            this.isSending = false
            //document.location.reload(true)
          })
        }
      },
      onRemoveLineProductAttributes() {
        if (this.$refs.formLineProdAttr.validate()) {
          this.isSending = true
          let data = {
            'attr': this.formLineProductAttributes,
            'line_product_id': this.form.line_product_id
          }
          this.removeBindAttributes(data).then(response => {
            this.isSending = false
            document.location.reload(true)
          })
        }
      },
      getRules(validations) {
        return validations ? this.validationConvert.ruleValidations(validations) : []
      },
      ...mapActions('Attribute', {
        load: ACTIONS.LOAD_BINDING_ATTRIBUTES,
        save: ACTIONS.SAVE_BINDINGS,
        removeBindAttributes: ACTIONS.REMOVE_BIND_ATTRIBUTES
      })
    }
  }
</script>