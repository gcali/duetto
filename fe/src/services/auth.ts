const baseUrl = "https://localhost:5001/api/auth"
export class AuthService {
    public async login(username: string, password: string): Promise<boolean> {
        const endpoint = `${baseUrl}`;
        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: "follow",
            cache: "no-cache",
            mode: "cors",
            credentials: "include"
        });

        return response.status === 200;
    }

    public async logout(): Promise<void> {
        const endpoint = `${baseUrl}/logout`;
        await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: "follow",
            cache: "no-cache",
            mode: "cors",
            credentials: "include"
        });
    }

    public async whoAmI(): Promise<string | null> {
        const endpoint = `${baseUrl}`;
        const response = await fetch(endpoint, {
            credentials: "include",
            redirect: "follow",
            cache: "no-cache",
            mode: "cors",
        });
        if (response.status !== 200) {
            return null;
        }
        const body = await response.json();
        return body.name;
    }
}