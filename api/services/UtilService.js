module.exports = {
  /**
   * Capitaliza frase
   * @param {String} string 
   */
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();
  }
}
