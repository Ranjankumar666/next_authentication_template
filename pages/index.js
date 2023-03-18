import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { withSessions, sessionOptions } from '@/helpers/sessions';
import { withIronSessionSsr } from 'iron-session/next';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ user }) {
	console.log('Home:', user);
	return <>{user}</>;
}

export const getServerSideProps = withSessions;
