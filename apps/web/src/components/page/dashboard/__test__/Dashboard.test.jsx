import { render, screen } from '@testing-library/react';
import { Dashboard } from '../Dashboard';

test('renders dashboard page', () => {
    render(<Dashboard />);
    const heading = screen.getByRole('heading', { name: /SomoTracker/i });
    expect(heading).toBeInTheDocument();
});