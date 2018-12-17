import {TreeNode} from "./tree-node";

export class BSTree {
    root: TreeNode = null;
    size: number = 0;

    constructor() {

    }

    add(value: number): BSTree {
        const newNode = new TreeNode(value);
        if (this.root) {
            const {found, parent} = this.findNodeAndParent(value);
            if (found) { // duplicated: value already exist on the tree
                found.meta.multiplicity = (found.meta.multiplicity || 1) + 1;
            } else if (value < parent.value) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
        } else {
            this.root = newNode;
        }
        this.size += 1;
        return this;
    }

    remove(value: number): TreeNode {
        const nodeToRemove = this.find(value);
        if (!nodeToRemove) return;

        const nodeToRemoveChildren = this.combineLeftIntoRightSubtree(nodeToRemove);


        if (nodeToRemove.meta.multiplicity && nodeToRemove.meta.multiplicity > 1) {
            nodeToRemove.meta.multiplicity -= 1;
        } else if (nodeToRemove === this.root) {
            this.root = nodeToRemoveChildren;
            this.root.parent = null;
        } else {
            const side = nodeToRemove.isParentLeftChild ? 'left' : 'right';
            const {parent} = nodeToRemove; // get parent
            parent[side] = nodeToRemoveChildren;
        }

        return nodeToRemoveChildren

    }

    find(value) {
        return this.findNodeAndParent(value).found;
    }


    findNodeAndParent(value) {
        let node = this.root;
        let parent: TreeNode;
        while (node) {
            if (node.value === value) {
                break;
            }
            parent = node;
            node = value > node.value ? node.right : node.left
        }
        return {found: node, parent}
    }

    combineLeftIntoRightSubtree(node) {
        if (node.right) {
            const leftmost = this.getMin(node.right);
            leftmost.left = node.left;
            return node.right;
        }
        return node.left;
    }

    getMin(root = this.root) {
        let current = root;
        while (current && current.left) {
            current = current.left;
        }
        return current;
    }

    getMax(root = this.root) {
        let current = root;
        while (current && current.right) {
            current = current.right
        }
        return current
    }

    * inOrderTraversal(node = this.root) {
        if (node.left) {
            yield* this.inOrderTraversal(node.left);
        }
        yield node;
        if (node.right) {
            yield* this.inOrderTraversal(node.right);
        }
    }

    /**
     * Pre-order traversal on a tree: root-left-right.
     * Similar results to DFS
     *
     * @param {TreeNode} node first node to start the traversal
     * @see dfs similar results to the breath first search
     */
    * preOrderTraversal(node = this.root) {
        yield node;
        if (node.left) {
            yield* this.preOrderTraversal(node.left);
        }
        if (node.right) {
            yield* this.preOrderTraversal(node.right);
        }
    }

    /**
     * Post-order traversal on a tree: left-right-root.
     *
     * @param {TreeNode} node first node to start the traversal
     */
    * postOrderTraversal(node = this.root) {
        if (node.left) {
            yield* this.postOrderTraversal(node.left);
        }
        if (node.right) {
            yield* this.postOrderTraversal(node.right);
        }
        yield node;
    }

}

const bst = new BSTree();
const root = bst.add(3)
    .add(1)
    .add(8)
    .add(2)
    .add(7)
    .add(9)
    .add(6)
console.log(Array.from(bst.inOrderTraversal()).map((node: TreeNode) => node.value));
