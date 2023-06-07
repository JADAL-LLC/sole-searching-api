function rawStrToUrl(str) {
    const strToLower = str.toLowerCase()
    const strLowerNoSpaces = strToLower.replaceAll(' ', '-')
    console.log(strToLower, strLowerNoSpaces)
    return strLowerNoSpaces
}

module.exports = { rawStrToUrl };