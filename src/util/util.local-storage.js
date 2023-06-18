const LOCAL_STORAGE_VARIABLE = 'SSO_ACCOUNT_ID'

const storeUserID = (id) => {
  localStorage.setItem(LOCAL_STORAGE_VARIABLE, id)
}

const getUserID = () => {
  return localStorage.getItem(LOCAL_STORAGE_VARIABLE)
}

const clearSession = () => {
  localStorage.removeItem(LOCAL_STORAGE_VARIABLE)
}

module.exports = {
  clearSession: clearSession,
  storeUserID: storeUserID,
  getUserID: getUserID,
}
