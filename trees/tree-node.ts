import {Meta} from "./NodeMeta";
import {RedBlackTreeNode} from "./RedBlackNode";

export enum ChDirection {
    LEFT,
    RIGHT,
}


class TreeNode {
    value: any;
    descendents: TreeNode | RedBlackTreeNode | null[] = [];
    parent: TreeNode;
    meta: Meta = {};
    parentSide: ChDirection;

    constructor(value: any) {
        this.value = value;
    }

    get left():TreeNode | RedBlackTreeNode | null {
        return this.descendents[ChDirection.LEFT];
    }

    set left(node: TreeNode|RedBlackTreeNode) {
        this.descendents[ChDirection.LEFT] = node;
        if (node) {
            node.parent = this;
            node.parentSide = ChDirection.LEFT;
        }
    }

    get right(): TreeNode | RedBlackTreeNode | null {
        return this.descendents[ChDirection.RIGHT];
    }

    set right(node: TreeNode|RedBlackTreeNode) {
        this.descendents[ChDirection.RIGHT] = node;
        if (node) {
            node.parent = this;
            node.parentSide = ChDirection.RIGHT;
        }
    }

    get parentChildSide() {
        if (this.parent) {
            return this.isParentLeftChild ? 'left' : 'right';
        }

        return 'root';
    }


    get isParentLeftChild() {
        return this.parentSide === ChDirection.LEFT;
    }

    get height(): number {
        return Math.max(this.leftSubTreeHeight, this.rightSubTreeHeight);
    }

    get leftSubTreeHeight(): number {
        return this.left ? this.left.height + 1 : 0;
    }

    get rightSubTreeHeight(): number {
        return this.right ? this.right.height + 1 : 0;
    }

    /**
     *平衡因子 左子树-右子树
     */
    get balanceFactor(): number {
        return this.leftSubTreeHeight - this.rightSubTreeHeight
    }


}


export {TreeNode}
