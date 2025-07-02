import React from 'react'
import { Authenticator, Button, Heading, Text, useTheme, View, Image, useAuthenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import "@aws-amplify/ui-react/styles.css"

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || "",
            userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || "",
        }
    }
})

const formFields = {
    signUp: {
        username: {
            order: 1,
            placeholder: 'Choose your User name',
            inputprops: {
                required: true,
            },
            label: 'User Name'
        },
        email: {
            order: 2,
            placeholder: 'Enter your email address',
            inputprops: {
                type: 'email',
                required: true,
            },
            label: 'Email'
        },
        password: {
            order: 3,
            placeholder: 'Choose a password',
            inputprops: {
                type: 'password',
                required: true,
            },
            label: 'Password'
        },
        confirm_password: {
            order: 4,
            placeholder: 'Confirm password',
            inputprops: {
                type: 'password',
                required: true,
            },
            label: 'Confirm Password'
        },
    },
}

const components = {
    Header() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Image
                    alt="Amplify logo"
                    src="https://sprinta-s3-images.s3.us-east-1.amazonaws.com/logo.png"
                    width={100}
                    height={100}
                />
            </View>
        );
    },

    Footer() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Text color={tokens.colors.neutral[80]}>
                    &copy; Sprinta-2025 All Rights Reserved
                </Text>
            </View>
        );
    },

    SignIn: {
        Header() {
            const { tokens } = useTheme();

            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Sign in to your account
                </Heading>
            );
        },
        Footer() {
            const { toForgotPassword } = useAuthenticator();

            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toForgotPassword}
                        size="small"
                        variation="link"
                    >
                        Reset Password
                    </Button>
                </View>
            );
        },
    },

    SignUp: {
        Header() {
            const { tokens } = useTheme();

            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Create a new account
                </Heading>
            );
        },
        Footer() {
            const { toSignIn } = useAuthenticator();

            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toSignIn}
                        size="small"
                        variation="link"
                    >
                        Back to Sign In
                    </Button>
                </View>
            );
        },
    },
    ConfirmSignUp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    SetupTotp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ConfirmSignIn: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ForgotPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ConfirmResetPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    SelectMfaType: {
        Header() {
            return <Heading level={3}>Select Desired MFA Type</Heading>;
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    SetupEmail: {
        Header() {
            return <Heading level={3}>Email MFA Setup</Heading>;
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
};

const AuthProvider = ({ children }: any) => {
    return (
        <div className='mt-5'>
            <Authenticator formFields={formFields} components={components}>
                {({ user }: any) =>
                    user ? (<div>{children}</div>)
                        : (
                            <div>
                                <h1>Please sign in below : </h1>
                            </div>
                        )}
            </Authenticator>
        </div>
    )
}

export default AuthProvider