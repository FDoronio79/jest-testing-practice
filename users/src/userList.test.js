import { render, screen, within } from '@testing-library/react';
import UserList from './userList';

function renderComponent() {
            // Render the component
    const users = [
        { name: 'jane', email: 'jane@jane.com' },
        { name: 'john', email: 'john@john.com' },
    ]

    render(<UserList users={users} />);
    return {
        users,
    };
}

test('render one row per user', () => {
    // Render the component
    renderComponent();
    // Find all the rows in the table
    // workaround 1
    const rows = within(screen.getByTestId('users')).getAllByRole('row');
    // workaround 2
    // const rows = container.querySelectorAll('tbody tr');

    // Assertion: correct number of rows in the table
    expect(rows).toHaveLength(2);
});

test('render the email and name of each user', () => {
    const { users } = renderComponent();

    for (let user of users) {
        const name = screen.getByRole('cell', { name: user.name });
        const email = screen.getByRole('cell', { name: user.email });

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    }
});