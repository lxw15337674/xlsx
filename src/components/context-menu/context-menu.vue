<script>
import Vue from 'vue';

export default {
    name: 'context-menu',
    mounted() {
        this.$el.addEventListener('contextmenu', this.OpenContextMenu, true);
        this.$el.addEventListener('click', this.closeContextMenu);
    },
    computed: {
        tipStyle() {
            let x = this.position.left;
            let y = this.position.top;
            return { left: `${x}px`, top: `${y}px` };
        },
    },
    data() {
        return {
            position: {
                left: 0,
                top: 0,
            },
            visible: false,
        };
    },
    methods: {
        OpenContextMenu(evt) {
            evt.preventDefault();
            if (this.visible) {
                this.closeContextMenu();
            } else {
                this.position.left = evt.pageX;
                this.position.top = evt.pageY;
                this.visible = true;
                this.$emit('contextmenu');
            }
        },
        closeContextMenu() {
            this.visible = false;
        },
        getFirstElement() {
            const slots = this.$slots.default;
            if (!Array.isArray(slots)) {
                return null;
            }
            let element = null;
            for (let index = 0; index < slots.length; index++) {
                if (slots[index] && slots[index].tag) {
                    element = slots[index];
                }
            }
            return element;
        },
    },
    props: {
        theme: {
            type: String,
            default: 'light',
            validator: function(value) {
                return ['dark', 'light'].indexOf(value) !== -1;
            },
        },
    },
    beforeCreate() {
        this.popperVM = new Vue({
            data: { node: '' },
            render(h) {
                return this.node;
            },
        }).$mount();
    },
    render(h) {
        this.popperVM.node = (
            <transition name='context-menu-fade'>
                <div
                    id='context-menu'
                    class={[this.theme, 'context-menu']}
                    style={this.tipStyle}
                    v-show={this.visible}
                    onClick={this.closeContextMenu}
                >
                    {this.$slots.contentMenu}
                </div>
            </transition>
        );
        const firstElement = this.getFirstElement();
        if (!firstElement) {
            return null;
        }
        if (this.popperVM) {
            document.body.appendChild(this.popperVM.$el);
        }
        return firstElement;
    },
    beforeDestroy() {
        this.popperVM && this.popperVM.$destroy();
    },
    destroyed() {
        this.$el.removeEventListener('oncontextmenu', this.handleOnContextMenu);
    },
};
</script>

<style scoped>
.context-menu {
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    border-radius: 4px;
    padding: 10px 0;
    font-size: 12px;
    line-height: 1.2;
    min-width: 10px;
    word-wrap: break-word;
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

.context-menu-fade-enter-active,
.context-menu-fade-leave-active {
    transition: opacity 0.3s;
}
.context-menu-fade-enter,
.context-menu-fade-leave-to {
    opacity: 0;
}
</style>
