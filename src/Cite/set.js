import parseInput from '../parse/input/chain'
import parseInputAsync from '../parse/input/async/chain'
import fetchId from '../util/fetchId'

/**
 * Add an object to the array of objects
 *
 * @method add
 * @memberof Cite
 * @this Cite
 *
 * @param {String|CSL|Object|Array<String>|Array<CSL>|Array<Object>} data - The data to add to your object
 * @param {Boolean} [log=false] - Show this call in the log
 *
 * @return {Cite} The updated parent object
 */
const add = function (data, log) {
  if (log) {
    this.save()
  }

  this.data = this.data.concat(parseInput(data))

  this.data.filter(entry => !entry.hasOwnProperty('id')).forEach(entry => {
    entry.id = fetchId(this.getIds(), 'temp_id_')
  })

  return this
}

/**
 * Add an object to the array of objects
 *
 * @method addAsync
 * @memberof Cite
 * @this Cite
 *
 * @param {String|CSL|Object|Array<String>|Array<CSL>|Array<Object>} data - The data to add to your object
 * @param {Boolean} [log=false] - Show this call in the log
 *
 * @return {Cite} The updated parent object
 */
const addAsync = async function (data, log) {
  if (log) {
    this.save()
  }

  this.data = this.data.concat(await parseInputAsync(data))

  this.data.filter(entry => !entry.hasOwnProperty('id')).forEach(entry => {
    entry.id = fetchId(this.getIds(), 'temp_id_')
  })

  return this
}

/**
 * Recreate a `Cite` object with almost any kind of data, and manipulate it with its default methods.
 *
 * @method set
 * @memberof Cite
 * @this Cite
 *
 * @param {String|CSL|Object|Array<String>|Array<CSL>|Array<Object>} data - The data to replace the data in your object
 * @param {Boolean} [log=false] - Show this call in the log
 *
 * @return {Cite} The updated parent object
 */
const set = function (data, log) {
  if (log) {
    this.save()
  }

  this.data = []
  this.add(data)

  return this
}

/**
 * Recreate a `Cite` object with almost any kind of data, and manipulate it with its default methods.
 *
 * @method setAsync
 * @memberof Cite
 * @this Cite
 *
 * @param {String|CSL|Object|Array<String>|Array<CSL>|Array<Object>} data - The data to replace the data in your object
 * @param {Boolean} [log=false] - Show this call in the log
 *
 * @return {Cite} The updated parent object
 */
const setAsync = async function (data, log) {
  if (log) {
    this.save()
  }

  this.data = []
  await this.addAsync(data)

  return this
}

/**
 * Reset a `Cite` object.
 *
 * @method reset
 * @memberof Cite
 * @this Cite
 *
 * @param {Boolean} [log=false] - Show this call in the log
 *
 * @return {Cite} The updated, empty parent object (except the log, the log lives)
 */
const reset = function (log) {
  if (log) {
    this.save()
  }

  this.data = []
  this._options = {}

  return this
}

export { add, addAsync, set, setAsync, reset }