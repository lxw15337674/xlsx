import { on } from 'src/utils/dom';

export default {
  data() {
    return {
      selectStart: false,
    };
  },
  methods: {
    //选取
    handleMousedown(evt, index) {
      evt.preventDefault();
      this.selectStart = true;
      // evt.preventDefault();
      // function handleMove(evt) {
      //   let index = parseFloat(evt.target.getAttribute('index'));
      // }
      // on(this.$el, 'mousemove', handleMove);
      this.$emit('selectStart', index);
    },
    handleMouseEnter(evt, index) {
      if (this.selectStart) {
        this.$emit('select', index);
      }
    },
    handleMouseUp(evt, index) {
      this.selectStart = false;
    },
    handleClick(index) {
      this.$emit('rowHeaderClick', index);
    },
  },
};
