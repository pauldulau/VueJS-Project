<template>
  <div class="star-rating">
    <label class="star-rating__star"
    v-for="rating in ratings"
    :class="{'is-selected': ((value_model >= rating) && value_model != null), 'is-disabled': disabled}"
    v-on:click="set(rating)"
    v-on:mouseover="star_over(rating)"
    v-on:mouseout="star_out">
    <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name" v-model="value_model" :disabled="disabled">
    ★
  </label>
</div>
</template>

<script>
export default {
  name: "star-rating",

  props: {
    value: null,
    disabled: Boolean,
    required: Boolean,
    name: String,
    id: String,
  },

  data: function () {
    return {
      value_model: this.value,
      temp_value: null,
      ratings: [1, 2, 3, 4, 5]
    };
  },

  methods: {
    star_over: function (index) {
      var self = this;

      if (!this.disabled) {
        this.temp_value = this.value_model;
        return this.value_model = index;
      }

    },
    star_out: function () {
      var self = this;

      if (!this.disabled) {
        return this.value_model = this.temp_value;
      }
    },

    set: function (value) {
      var self = this;

      if (!this.disabled) {
        this.temp_value = value;
        return this.value_model = value;
      }
    }
  },
  watch: {
    value_model(val) {
      this.$emit('input', val)
    }
  },
}
</script>

<style scoped>
.star-rating__checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: 1px;
  padding: 0;
  border: 0;
}
.star-rating__star {
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
  line-height: 1;
  font-size: 35px;
  color: #545454;
  transition: color 0.3s ease-out;
}
.star-rating__star:hover {
  cursor: pointer;
}
.star-rating__star.is-selected {
  color: #E5E500;
}
.star-rating__star.is-disabled:hover {
  cursor: default;
}
</style>
