export default function genNodeRef(nodeRef) {
  const res = nodeRef.get();
  res.childrenIds = nodeRef.childrenIds;
  res.contextIds = nodeRef.contextIds.get();
  // res.element = node.element;
  res.hasChildren = nodeRef.hasChildren;
  return res;
}
