export function generateMarkup(images) {
  return images
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) =>
        `<a class='photo-card' href='${webformatURL}'>
            <img src='${webformatURL}' alt='${tags}' loading='lazy' />
            <div class='info'>
              <p class='info-item'>
                <b>Likes ${likes}</b>
              </p>
              <p class='info-item'>
                <b>Views ${views}</b>
              </p>
              <p class='info-item'>
                <b>Comments ${comments}</b>
              </p>
              <p class='info-item'>
                <b>Downloads ${downloads}</b>
              </p>
            </div>
          </a>`,
    )
    .join('');
}
