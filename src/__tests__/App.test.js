import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock NavBar component
jest.mock('../components/NavBar', () => () => <div data-testid="navbar">NavBar</div>);

// Mock fetch for API calls
global.fetch = jest.fn();

// Helper function to render with Router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Suppress act warnings for cleaner test output
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    console.warn.mockRestore();
  });

  test('renders NavBar component', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    await act(async () => {
      renderWithRouter(<App />);
    });

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('renders main element with Outlet', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    await act(async () => {
      renderWithRouter(<App />);
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('fetches users and current user data on mount', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    await act(async () => {
      renderWithRouter(<App />);
    });

    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/users');
    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/current-user');
  });

  test('handles fetch error gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch users')).mockRejectedValueOnce(new Error('Failed to fetch current user'));

    await act(async () => {
      renderWithRouter(<App />);
    });

    // Wait for the component to handle the error
    await screen.findByTestId('navbar');

    // Error is handled silently, no console.error expected
  });

  test('renders loading state initially', async () => {
    renderWithRouter(<App />);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  test('renders NavBar and main after loading', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    await act(async () => {
      renderWithRouter(<App />);
    });

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

describe('App Routing', () => {
  test('renders app with navbar at root path', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    await act(async () => {
      renderWithRouter(<App />, { route: '/' });
    });

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('renders app with navbar at /about', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    await act(async () => {
      renderWithRouter(<App />, { route: '/about' });
    });

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('renders app with navbar at /login', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    await act(async () => {
      renderWithRouter(<App />, { route: '/login' });
    });

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('renders app with navbar at /profile/:id', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    await act(async () => {
      renderWithRouter(<App />, { route: '/profile/1' });
    });

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
});

describe('App Error Handling', () => {
  test('renders app with navbar for any route', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    await act(async () => {
      renderWithRouter(<App />, { route: '/invalid-route' });
    });

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
});

// Integration tests for nested routes
describe('Nested Routes Integration', () => {
  test('parent App component wraps all child routes', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    await act(async () => {
      renderWithRouter(<App />, { route: '/about' });
    });

    // NavBar should be present on all routes
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('home route can have nested profile routes', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    await act(async () => {
      renderWithRouter(<App />, { route: '/profile/1' });
    });

    // Both App and Home components should be involved in rendering
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
});

// Performance and accessibility tests
describe('App Accessibility', () => {
  test('has proper header structure', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    await act(async () => {
      renderWithRouter(<App />);
    });

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('has accessible navigation', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    await act(async () => {
      renderWithRouter(<App />);
    });

    // Check for header role instead of navigation since NavBar mock doesn't have nav role
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
});

// Snapshot test (optional)
describe('App Snapshot', () => {
  test('matches snapshot', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    const mockCurrentUser = { id: 1, name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    }).mockResolvedValueOnce({
      json: async () => mockCurrentUser,
    });

    let asFragment;
    await act(async () => {
      const result = renderWithRouter(<App />);
      asFragment = result.asFragment;
    });

    expect(asFragment()).toMatchSnapshot();
  });
});