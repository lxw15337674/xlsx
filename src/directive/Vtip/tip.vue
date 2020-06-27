<template>
    <transition name="v-tip-fade">
        <div
            id="_tip"
            class="tip"
            :class="theme"
            :style="tipStyle"
            v-show="visible"
        >
            {{ content }}
        </div>
    </transition>
</template>

<script>
export default {
    name: 'tip',
    mounted() {},
    computed: {
        tipStyle() {
            return {
                left: `${this.position.left + this.position.width / 2}px`,
                top: `${this.position.bottom + 10}px`,
            };
        },
    },
    data() {
        return {};
    },

    props: {
        theme: {
            type: String,
            default: 'light',
            validator: function(value) {
                return ['dark', 'light'].indexOf(value) !== -1;
            },
        },
        content: {
            default: '',
        },
        visible: {
            type: Boolean,
            default: false,
        },
        // 相对元素的位置
        position: {
            type: Object,
            default: () => {
                return {
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: 0,
                    height: 0,
                };
            },
        },
    },
};
</script>

<style scoped>
.tip {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    border-radius: 4px;
    padding: 5px 15px;
    font-size: 15px;
    line-height: 1.2;
    min-width: 10px;
    pointer-events: none;
    word-wrap: break-word;
    transform: translate(-50%, 0);
}
.tip:before {
    content: ' ';
    border-width: 2px 8px 6px 8px;
    border-style: solid;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: -7px;
    border-color: transparent transparent #303133 transparent;
}

.dark {
    background: #303133;
    color: #fff;
}
.light {
    color: #303133;
    background: #fff;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    border: 1px solid #d9d9d9;
}

.v-tip-fade-enter-active,
.v-tip-fade-leave-active {
    transition: opacity 0.3s;
}
.v-tip-fade-enter,
.v-tip-fade-leave-to {
    opacity: 0;
}
</style>
