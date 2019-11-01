/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['Kyre', 'editor']
  valid_map.push(str)
  console.log("客户吗？")
  console.log(valid_map)
  return valid_map.indexOf(str.trim()) >= 0
}
