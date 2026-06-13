const postForm = document.getElementById('postForm');
const postsTableBody = document.querySelector('#postsTable tbody');
const statsList = document.getElementById('stats');
const randomIdeaBtn = document.getElementById('randomIdeaBtn');
const randomIdeaPara = document.getElementById('randomIdea');
const hashtagsPara = document.getElementById('hashtags');

let posts = [];

postForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const date = document.getElementById('postDate').value;
  const platform = document.getElementById('postPlatform').value;
  const title = document.getElementById('postTitle').value;
  const url = document.getElementById('postURL').value;
  const status = document.getElementById('postStatus').value;

  const post = { date, platform, title, url, status };
  posts.push(post);
  renderPosts();
  renderStats();

  postForm.reset();
});

function renderPosts() {
  postsTableBody.innerHTML = '';
  posts.forEach((post) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${post.date}</td>
      <td>${post.platform}</td>
      <td>${post.title}</td>
      <td>${post.status}</td>
      <td>${post.url ? `<a href="${post.url}" target="_blank">Link</a>` : ''}</td>
    `;
    postsTableBody.appendChild(tr);
  });
}

function renderStats() {
  const counts = {};
  posts.forEach((post) => {
    const key = `${post.platform}-${post.status}`;
    counts[key] = (counts[key] || 0) + 1;
  });
  statsList.innerHTML = '';
  Object.keys(counts).forEach((key) => {
    const [platform, status] = key.split('-');
    const li = document.createElement('li');
    li.textContent = `${platform} - ${status}: ${counts[key]}`;
    statsList.appendChild(li);
  });
}

const ideas = [
  'Laat zien hoe je een fiets in elkaar zet',
  'Vertel een onderhoudstip',
  'Deel een verhaal van een klant',
  'Maak een video van een fietstocht door Mechelen',
  'Toon voor en na beelden van een restauratie'
];

const hashtags = ['#fiets', '#handgemaakt', '#Mechelen', '#duurzaam', '#fietsliefde'];

randomIdeaBtn.addEventListener('click', () => {
  const idea = ideas[Math.floor(Math.random() * ideas.length)];
  const tags = hashtags.sort(() => 0.5 - Math.random()).slice(0, 3).join(' ');
  randomIdeaPara.textContent = idea;
  hashtagsPara.textContent = `Probeer deze hashtags: ${tags}`;
});
