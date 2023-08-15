document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    githubForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchQ = searchInput.value;
        searchUsers(searchQ);
    });

    async function searchUsers(query) {
        const url = `https://api.github.com/search/users?q=${query}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                displayUsers(data.items);
            } else {
                console.error('Error searching users:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    
    async function getUserRepos(username) {
        const url = `https://api.github.com/users/${username}/repos`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (response.ok) {
                const repos = await response.json();
                displayRepos(repos);
            } else {
                console.error('Error fetching user repositories:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    
    function displayUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const userItem = document.createElement('li');
            userItem.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}" width="50">
                <a href="${user.html_url}" target="_blank">${user.login}</a>
            `;
            userItem.addEventListener('click', () => {
                getUserRepos(user.login);
            });
            userList.appendChild(userItem);
        });
    }

    function displayRepos(repos) {
        reposList.innerHTML = '';
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `
                <strong>${repo.name}</strong>: ${repo.description}
            `;
            reposList.appendChild(repoItem);
        });
    }
});
