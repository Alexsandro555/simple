<template>
  <div>
    <v-card>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs2>
          </v-flex>
          <v-flex xs8 align-end flexbox v-if="attributes.lenght!==0">
            <br>
            <div v-if="attributes.length>0">
              <v-form ref="form">
                <template v-for="(attribute, index) in attributes">
                  <v-container grid-list-md>
                    <v-layout col wrap>
                      <v-flex xs12>
                        <v-text-field
                          v-if="attribute.attribute_type_id==2"
                          :name="attribute.alias"
                          :label="attribute.title"
                          :value="getValue(attribute.id)"
                          @input="updateAttribute($event, attribute.id)">
                        </v-text-field>
                        <v-text-field
                          v-else-if="attribute.attribute_type_id==5"
                          :name="attribute.alias"
                          :label="attribute.title"
                          :value="getValue(attribute.id)"
                          @input="updateAttribute($event, attribute.id)"
                          prefix="₽">
                        </v-text-field>
                        <v-text-field
                          v-else-if="attribute.attribute_type_id==4"
                          :name="attribute.alias"
                          :label="attribute.title"
                          @input="updateAttribute($event, attribute.id)"
                          :value="getValue(attribute.id)">
                        </v-text-field>
                        <v-checkbox
                          v-else-if="attribute.attribute_type_id==1"
                          :name="attribute.alias"
                          :label="attribute.title"
                          @input="updateAttribute($event, attribute.id)"
                          :value="getValue(attribute.id)">
                        </v-checkbox>
                        <v-select
                          v-else-if="attribute.attribute_type_id==6"
                          :name="attribute.alias"
                          :items="attribute.attribute_list_value"
                          :label="attribute.title"
                          :id="attribute.alias"
                          no-data-text="Нет данных"
                          @input="updateAttribute($event, attribute.id)"
                          :value="getValue(attribute.id)"
                          item-text="title"
                          item-value="id"
                          single-line>
                        </v-select>
                        <v-menu
                          v-else-if="attribute.attribute_type_id==3"
                          v-model="menu"
                          transition="scale-transition"
                          :nudge-left="40"
                          :close-on-content-click="false"
                          full-width
                          max-width="290">
                          <v-text-field
                            slot="activator"
                            :label="attribute.title"
                            :value="getValue(attribute.id)"
                            prepend-icon="event"
                            readonly>
                          </v-text-field>
                          <v-date-picker
                            v-model="date"
                            :allowed-dates="v => v>=dateFns.format(Date.now(),'YYYY-MM-DD')"
                            locale="ru-ru"
                            @change="updateDate({date, id: attribute.id})">
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </template>
                <v-flex xs12 text-xs-left>
                  <v-btn :disabled="!attributes.length>0" large color="primary" @click.prevent="onSave()">Сохранить</v-btn>
                </v-flex>
              </v-form>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import {ACTIONS} from '@product/constants'

  export default {
    props: {
      attributes: {
        type: Array,
        default: []
      },
      values: {
        type: Array,
        default: []
      },
      id: {
        type: Number,
        required: true
      }
    },
    data: function() {
      return {
        valid: false,
        selectedRules: [
          v => this.selectRequired(v),
        ],
        requiredRules: [
          v => this.required(v)
        ],
        menu: false,
        date: null,
        original: [...this.values],
        changed: []
      }
    },
    methods: {
      ...mapActions('Attribute', {save: ACTIONS.SAVE_DATA}),
      selectRequired(v) {
        return !!v || 'Необходимо выбрать значение'
      },
      required(v) {
        return !!v || 'Обязательное для заполнения'
      },
      getValue(id) {
        if(this.original.length>0) {
          let element = this.original.find(item => item.attribute.id == id)
          if(element) {
            return element.value
          }
          else {
            return null
          }
        }
        else {
          return null
        }
      },
      updateAttribute(value, id) {
        let element = this.changed.find(item => item.attribute_id == id)
        if(element) {
          element = Object.assign(element, {attribute_id: id, value})
        }
        else {
          this.changed.push({attribute_id: id, value})
        }
      },
      updateDate({date, id}) {
        this.updateAttribute(date, id)
        this.menu = false
      },
      onSave() {
        if(this.$refs.form.validate()) {
          this.save({attr: this.changed, id: this.id})
          window.location.reload()
        }
      }
    }
  }
</script>