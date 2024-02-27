import axios from "axios";
const path = "http://localhost:3001";

export async function getTemplates() {
  try {
    const { data } = await axios(`${path}/templates`);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function postNewTemplate(template) {
  console.log(template);
  try {
    const result = await axios.post(`${path}/templates`, template);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function updateTemplate(id, template) {
  try {
    const result = await axios.put(`${path}/templates/${id}`, template);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}
