const APIURL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export async function fetchAllBooks() {
  try {
    const response = await fetch(`${APIURL}/books`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
export async function fetchBook(bookId) {
  try {
    const response = await fetch(`${APIURL}/books/${bookId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function registerUser(firstname, lastname, email, password) {
  try {
    const response = await fetch(`${APIURL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${APIURL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUser(token) {
  try {
    const response = await fetch(`${APIURL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateBookRegistration(token, bookId, available) {
  try {
    const response = await fetch(`${APIURL}/books/${bookId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        available: available,
      }),
    });
    const result = await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchBookRegistrations(token) {
  try {
    const response = await fetch(`${APIURL}/reservations/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteBookRegistration(token, reservationId) {
  try {
    const response = await fetch(`${APIURL}/reservations/${reservationId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
  }
}
