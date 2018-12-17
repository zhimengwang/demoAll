import {ChDirection, TreeNode} from "./tree-node";
import {Meta} from "./NodeMeta";

export enum RED_BLACK_TREE_COLORS {
    red = 'red',
    black = 'black',
}


export class RedBlackTreeNode extends TreeNode {
    meta: Meta = {};
    parent: RedBlackTreeNode;

    constructor(value: any) {
        super(value)
    }

    get grandParent() {
        return this.parent.parent
    }

    get left(): RedBlackTreeNode | null {
        return this.descendents[ChDirection.LEFT];
    }

    set left(node: RedBlackTreeNode) {
        this.descendents[ChDirection.LEFT] = node;
        if (node) {
            node.parent = this;
            node.parentSide = ChDirection.LEFT;
        }
    }

    get right(): RedBlackTreeNode | null {
        return this.descendents[ChDirection.RIGHT];
    }

    set right(node: RedBlackTreeNode) {
        this.descendents[ChDirection.RIGHT] = node;
        console.log(ChDirection.RIGHT);
        if (node) {
            node.parent = this;
            node.parentSide = ChDirection.RIGHT;
        }
    }


    get color() {
        return this.meta.color
    }

    set color(color) {
        this.meta.color = color
    }

    get uncle(): RedBlackTreeNode {
        if (!this.parent||!this.parent.parent) {
            return null
        }
        const uncleSide = this.parent.isParentLeftChild ? 'right' : 'left';
        // @ts-ignore
        return this.parent.parent[uncleSide];
    }

}
