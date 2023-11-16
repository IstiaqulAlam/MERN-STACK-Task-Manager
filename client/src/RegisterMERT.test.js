import RegisterMERT from './RegisterMERT';
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("RegisterMERT", () => {
    test("should contain a link to login", () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<RegisterMERT/>}/>
                </Routes>
            </MemoryRouter>,
        );
        const links: HTMLAnchorElement[] = screen.getAllByRole("link");

        expect(links[0].textContent).toEqual("Login");
        expect(links[0].href).toContain("/login");
    });
})