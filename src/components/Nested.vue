<template>
  <div>
    <draggable
      class="list-group"
      ghost-class="ghost"
      :list="todoTasks.tasks"
      :group="{ name: 'description' }"
      tag="div"
      v-bind="dragOptions"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group type="transition" :name="!isDragging ? 'flip-list' : null">
        <div
          class="list-group-item"
          v-for="element in tasks"
          :key="element.id"
        >
          <div>
            {{ element.title }} -
            <small>{{element.body}}</small>
          </div>
          <span v-if="element.tasks.length > 0">
            <nested-draggable :tasks="element.tasks" />
          </span>
          <span v-else>
            <nested-draggable :tasks="element.tasks" />
            <span class="dragOld">Drag other to make its child</span>
          </span>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  props: {
    tasks: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
    todoTasks(val) {
      this.$parent.$emit("changed", val);
      deep: false;
    }
  },
  methods: {
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }
  },
  components: {
    draggable
  },
  name: "nested-draggable",
  computed: {
    dragOptions() {
      return {
        animation: 250,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    todoTasks() {
      return {
        tasks: this.tasks
      };
    }
  }
};
</script>
<style scoped>
/* draggable css*/
.flip-list-move {
  transition: linear transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 10px;
}
.list-group-new {
  min-height: 20px;
}
span > div.list-group > span > div.list-group-item {
  cursor: move;
  position: relative;
  display: block;
  padding: 0.55rem 0 0.55rem 1rem;
  margin-bottom: -1px;
  background-color: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.125);
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  border-right: 0px solid rgba(0, 0, 0, 0.125);
  border-radius: 0px;
}
.list-group-item i {
  cursor: pointer;
}
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
.dragOld {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border: 1px dashed grey;
  display: block;
  min-height: 20px;
}
</style>