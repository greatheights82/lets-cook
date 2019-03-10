import { Permissions } from 'expo'

const checkPermissionsAsync = async permissionType => {
  const get = await Permissions.getAsync(Permissions[permissionType])
  console.log('get response', get)
  if (get.status !== 'granted') {
    try {
      const ask = await Permissions.askAsync(Permissions[permissionType])
      console.log('ask response', ask)
      if (ask.status === 'denied') {
        console.log('im false')
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
  return true
}

export default checkPermissionsAsync
