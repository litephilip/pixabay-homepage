const apiKey = "19552697-3afe5c02eb386dd768dfbae25";

const form = document.querySelector("form");
form.onsubmit = async (event) => {
  event.preventDefault();

  const q = document.querySelector("[name=q]");
  const query = q.value;

  const colorCheckboxes = Array.from(document.querySelectorAll("[name=color]"));
  const checkedColorCheckboxes = colorCheckboxes.filter((c) => c.checked);
  const colors = checkedColorCheckboxes.map((c) => c.value);
  const colorString = colors.join(","); // join() creates and return new string of all elements. separates by ,

  const categoryDropdown = document.querySelector("[name=category]");
  const category = categoryDropdown.value;

  const widthInput = document.querySelector("[name=width]");
  const width = widthInput.valueAsNumber;

  const heightInput = document.querySelector("[name=height]");
  const height = heightInput.valueAsNumber;
  // encodeURIComponent to allow for special characters like  (&) etc.
  const url =
    "https://pixabay.com/api/?" +
    "key=" +
    encodeURIComponent(apiKey) +
    "&q=" +
    encodeURIComponent(query) +
    "&colors=" +
    encodeURIComponent(colorString) +
    "&min_width=" +
    encodeURIComponent(width) +
    "&min_height=" +
    encodeURIComponent(height) +
    "&category=" +
    encodeURIComponent(category);

  const rawResponse = await fetch(url);
  const response = await rawResponse.json();

  const resultList = document.getElementById("result");
  while (resultList.firstChild) {
    resultList.firstChild().remove();
  }

  response.hits.forEach((hit) => {
    const img = document.createElement("img");
    img.src = hit.previewURL;

    const a = document.createElement("a");
    a.href = hit.largeImageURL;
    a.appendChild(img);

    const li = document.createElement("li");
    li.appendChild(a);

    resultList.appendChild(li);
  });
};
