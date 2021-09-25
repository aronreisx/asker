//Compare content name with requested view name
exports.isPage = function (content, view) {
    return content == view ? true : false;
}
//Checks if an array is empty
exports.emptyArray = function (array) {
    return array == 0 ? true : false;
}