import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import MissionForm from './MissionForm';

test("MissionForm renders correctly", ()=> {
    render(<MissionForm />);
});

test('renders message when isFetchingData is true', ()=>{
    render(<MissionForm isFetchingData={true}/>);
    const value = screen.queryByText(/we are fetching data/i);
    expect(value).not.toBeNull();
});

test('renders button when isFetchingData is false', ()=>{
    render(<MissionForm isFetchingData={false}/>);
    const value = screen.queryByRole("button");
    expect(value).not.toBeNull();
});

test('calls getData when Button is pressed', ()=>{
    const mockGetData = jest.fn(()=>{return("warren")});
    render(<MissionForm getData={mockGetData}/>);
    
    const button = screen.getByRole("button");
    fireEvent.click(button);
    
    expect(mockGetData.mock.calls.length === 1);
    expect(mockGetData.mock.calls.length).toBe(1);
    expect(mockGetData.mock.calls).toHaveLength(1);
});