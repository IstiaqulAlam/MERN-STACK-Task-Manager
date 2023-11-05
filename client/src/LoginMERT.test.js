import LoginMERT from './LoginMERT';
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("LoginMERT", () => {
    test("should contain a link to register", () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<LoginMERT/>}/>
                </Routes>
            </MemoryRouter>,
        );
        const links: HTMLAnchorElement[] = screen.getAllByRole("link");

        expect(links[0].textContent).toEqual("Register");
        expect(links[0].href).toContain("/register");
    });
})
