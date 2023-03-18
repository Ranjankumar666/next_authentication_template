import {
	Container,
	Input,
	Flex,
	Button,
	Stack,
	Text,
	Link,
} from '@chakra-ui/react';
import { Link as NextLink } from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submit, setSubmit] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (email && password) setSubmit(true);
	}, [email, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email && !password) return;

		setIsSubmitting(true);

		const res = await fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
			}),
		});

		if (!res.ok) {
			setIsSubmitting(false);
			throw new Error(await res.json().message);
		}

		setIsSubmitting(false);
		router.push('/');
	};
	return (
		<Container
			w="100vw"
			h="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Flex
				as="form"
				justifyContent="center"
				rowGap="5"
				flexDir="column"
				border="1px solid"
				borderRadius="5px"
				padding="25px"
				onSubmit={handleSubmit}
			>
				<Stack>
					<label htmlFor="">Email</label>
					<Input
						autoComplete="email"
						name="email"
						size="md"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Stack>
				<Stack>
					<label htmlFor="">Password</label>
					<Input
						type="password"
						autoComplete="new-password"
						name="new-password"
						size="md"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Stack>
				<Stack>
					<Button
						size="md"
						disabled={submit}
						type="submit"
						isLoading={isSubmitting}
					>
						Log in
					</Button>
				</Stack>

				<Stack>
					<Text fontSize="sm" textAlign="center">
						New ?{' '}
						<Link color="teal.500" as={NextLink} href="/signup">
							Sign up
						</Link>
					</Text>
				</Stack>
			</Flex>
		</Container>
	);
};

export default Login;
