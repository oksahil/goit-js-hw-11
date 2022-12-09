export const photoTemplate = ({ webformatURL, tags, likes, views, comments, downloads, largeImageURL }) => {
 
    return `<li class="item-card list">
<a  class="simplelightbox" href="${largeImageURL}"> 
                <img class="img-card" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>

                    
                    <div class="info list">
                        <ul class="ul-info list">
                            <li>
                                <p class="info-item">
                                <b>Likes</b>
                                </p>
                                <p>${likes}</p>
                            </li>
                            <li>
                                <p class="info-item">
                                <b>Views</b>
                                </p>
                                <p>${views}</p>
                            </li>
                            <li>
                                <p class="info-item">
                                <b>Comments</b>
                                </p>
                                <p>${comments}</p>
                            </li>
                            <li>
                                <p class="info-item">
                                <b>Downloads</b>
                                </p>
                                <p>${downloads}</p>
                            </li>
                        </ul>
                    </div>
</li>
    `;
}
