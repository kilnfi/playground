import type { NextPage } from 'next';
import React from 'react';
import Seo from '../components/Seo';
import Button from "../components/UI/Button";

const Custom404: NextPage = () => {
  return (
    <>
      <Seo title="404 - Not found"/>
      <div
        className="bg-white min-h-screen px-4 py-16 tablet:px-6 tablet:py-24 laptop:grid laptop:place-items-center laptop:px-8">
        <div className="max-w-max mx-auto">
          <main className="tablet:flex">
            <p
              className="text-4xl font-extrabold text-primary tablet:text-5xl">404</p>
            <div className="tablet:ml-6">
              <div
                className="tablet:border-l tablet:border-gray-200 tablet:pl-6">
                <h1
                  className="text-4xl font-extrabold text-gray-900 tracking-tight tablet:text-5xl">Page
                  not found</h1>
                <p className="mt-2 text-base text-gray-500">Please check the URL
                  in the address bar and try again.</p>
              </div>
              <div
                className="mt-10 flex space-x-3 tablet:border-l tablet:border-transparent tablet:pl-6">
                <Button
                  href="/"
                >
                  Go back home
                </Button>
                <Button
                  variant="secondary"
                  href="mailto:support@skillz.io"
                >
                  Contact support
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Custom404;
