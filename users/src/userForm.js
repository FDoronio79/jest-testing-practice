import { useState } from 'react';

function UserForm({ onUserAdd }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        onUserAdd({ name, email })
        setName('');
        setEmail('');
    }

    return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
            <button> Add User </button>
        </div>
    </form>
    )
}

export default UserForm;