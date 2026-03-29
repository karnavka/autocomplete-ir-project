import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TrieAutoComp {

    public class Node {
        Map<Character, Node> children;
        char c;
        boolean isWord;

        public Node(char c) {
            this.c = c;
            children = new HashMap<>();
        }
        public Node() {
            children = new HashMap<>();
        }
        public void insert(String word) {
            if (word == null || word.isEmpty())
                return;
            char firstChar = word.charAt(0);
            Node child = children.get(firstChar);
            if (child == null) {
                child = new Node(firstChar);
                children.put(firstChar, child);
            }
            if (word.length() > 1)
                child.insert(word.substring(1));
            else
                child.isWord = true;
        }
    }

    Node root;

    public TrieAutoComp(List<String> words) {
        root = new Node();
        for (String word : words)
            root.insert(word);
    }
    public boolean find(String prefix) {
        Node lastNode = root;
        for (char c : prefix.toCharArray()) {
            lastNode = lastNode.children.get(c);
            if (lastNode == null)
                return false;
        }
        return lastNode.isWord;
    }
    
    public void suggest(Node root, List<String> list, StringBuffer curr) {
        if (root.isWord) list.add(curr.toString());
        if (root.children == null || root.children.isEmpty())
            return;
        for (Node child : root.children.values()) {
            suggest(child, list, curr.append(child.c));
            curr.setLength(curr.length() - 1);
        }
    }

    public List<String> suggest(String prefix) {
        List<String> list = new ArrayList<>();
        Node lastNode = root;
        StringBuffer curr = new StringBuffer();
        for (char c : prefix.toCharArray()) {
            lastNode = lastNode.children.get(c);
            if (lastNode == null)
                return list;
            curr.append(c);
        }
        suggest(lastNode, list, curr);
        return list;
    }

    public static void main(String[] args) {
        List<String> words = List.of("app ", "apple", "car", "cat", "case");
        TrieAutoComp trie = new TrieAutoComp(words);

        System.out.println(trie.suggest("app"));
    }

}