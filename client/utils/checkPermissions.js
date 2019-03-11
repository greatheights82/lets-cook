import { Permissions } from 'expo'

const checkPermissionsAsync = async permissionType => {
  const get = await Permissions.getAsync(Permissions[permissionType])
  if (get.status !== 'granted') {
    try {
      const ask = await Permissions.askAsync(Permissions[permissionType])
      if (ask.status === 'denied') {
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
