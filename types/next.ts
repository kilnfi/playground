import { NextPage as NP } from 'next';
import { AppProps as AP } from 'next/app';

export type NextPage = NP;

export type AppProps = AP & {
  Component: NextPage;
};
