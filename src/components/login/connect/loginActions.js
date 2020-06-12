function mockGetUser() {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          user: {
            authenticated: true,
            authToken: 'cGFzc3dvcmQxMjM='
          }
        }),
      2000
    );
  });
}

export function getUser() {
  return dispatch => {
    dispatch(getUserBegin());
    return mockGetUser()
      .then(json => {
        dispatch(getUserSuccess(json.user));
        return json.user;
      })
      .catch(error =>
        dispatch(getUserFailure(error))
      );
  };
}


export const GET_USER_BEGIN = "GET_USER_BEGIN";
export const GET_USER_SUCCESS =
  "GET_USER_SUCCESS";
export const GET_USER_FAILURE =
  "GET_USER_FAILURE";

export const getUserBegin = () => ({
  type: GET_USER_BEGIN
});

export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  payload: { user }
});

export const getUserFailure = error => ({
  type: GET_USER_FAILURE,
  payload: { error }
});
