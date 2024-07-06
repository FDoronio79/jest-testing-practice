import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import RepositoriesListItem from './RepositoriesListItem';


// Mock FileIcon (or any component you don't want to render) component for testing to avoid 'act' warning
// jest.mock('../tree/FileIcon', () => {
//     // Content of FileIcon.js
//     return () => {
//         return 'File Icon Component';
//     }
// })

function RenderComponent() {
    const repository = {
        full_name: 'facebook/react',
        language: 'Javascript',
        description: 'A js library',
        owner: {
            login: 'facebook',
        },
        name: 'react',
        html_url: 'https://github.com/facebook/react'
    }
    render(
    <MemoryRouter>
        <RepositoriesListItem repository={repository}/>
    </MemoryRouter> 
    );

    return { repository };
}

test('shows a link to the github homepage for this repository', async () => {
    const { repository } = RenderComponent();

    // using findByRole or findAllByRole to avoid 'act' warning
    await screen.findByRole('img', { name: /javascript/i})

    // worst way of getting around 'act' warning try not to use 
    // await act(async () => {
    //     await pause();
    // })

    const link = screen.getByRole('link', { name: /github repository/i});

    expect(link).toHaveAttribute('href', repository.html_url)
});

test('shows a file icon with the appropriate icon', async () => {
    RenderComponent();

    const icon = await screen.findByRole('img', { name: /javascript/i });

    expect(icon).toHaveClass('js-icon');
})

test('shows a link to the code editor page', async () => {
    const { repository} = RenderComponent();

    await screen.getByRole('img');

    const link = await screen.findByRole('link', {name: new RegExp(repository.owner.login)});

    expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`)
})

// const pause = () => { new Promise(resolve => setTimeout(resolve, 100))}