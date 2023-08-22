// import axios from 'axios';
// import Notiflix from 'notiflix';

// // Unique KEY & BSE_URL
// const API_KEY = '38980097-7acd167c88be026b0eb497bb1';
// const BASE_URL = 'https://pixabay.com/api/';

// axios.defaults.baseURL = 'https://pixabay.com/api/';

// // function serviceImages(value) {
// //   const params = new URLSearchParams({
// //     key: API_KEY,
// //     q: value,
// //     image_type: 'photo',
// //     orientation: 'horizontal',
// //     safesearch: true,
// //   });

// //   return fetch(`${BASE_URL}?${params}`).then(response => {
// //     if (!response.ok) {
// //       throw new Error(response.statusText);
// //     }
// //     return response.json();
// //   });
// // }

// // serviceImages();

// async function searchImg(page, searchQuery) {
//   const params = {
//     key: '33623115-47a36c1983cc36082c4bb974d',
//     q: searchQuery,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     per_page: 40,
//     page: page,
//   };
//   const searchParams = new URLSearchParams(params);
//   const response = await axios.get(
//     `https://pixabay.com/api/?${searchParams.toString()}`
//   );
//   return response.data;
// }

// export { searchImg };
