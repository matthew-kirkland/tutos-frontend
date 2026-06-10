const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`

export const requestPost = async (path, body, token) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` })
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};

export const requestPut = async (path, body, token) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` })
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};

export const requestGet = async (path, token) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` })
    }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};

export const requestDelete = async (path, body, token) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` })
    }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};