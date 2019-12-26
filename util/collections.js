// add all items in set s2 to set s1
function addSets(s1, s2) {
  s2.forEach(e => {
    s1.add(e);
  });

  return s1;
}

function setToSortedArray(s1) {
  return Array.from(s1).sort();
}

module.exports.addSets = addSets;
module.exports.setToSortedArray = setToSortedArray;
