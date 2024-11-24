import * as z from 'zod';

import { Form, Input, SelectField, TextAreaInput } from '@/components/form';
import { programmingLanguages } from '@/features/group/data/languages.ts';

const schema = z.object({
	title: z.string().min(1, 'Required'),
	description: z.string().optional(),
	language: z.string().min(1, 'Required'),
});

type GroupFormValues = {
	title: string;
	description: string;
	language: string;
};

type GroupFormProps = {
	onSuccess: () => void;
};

export const GroupForm = ({ onSuccess }: GroupFormProps) => {
	// const { login, isLoggingIn } = useAuth();
	const isLoggingIn = false;

	return (
		<div>
			<Form<GroupFormValues, typeof schema>
				onSubmit={async (values) => {
					// await login(values);
					console.log(values);
					onSuccess();
				}}
				schema={schema}
			>
				{({ register, formState }) => (
					<>
						<Input
							type="text"
							label="Group Tile"
							error={formState.errors['title']}
							registration={register('title')}
						/>
						<TextAreaInput
							label="Description"
							error={formState.errors['description']}
							registration={register('description')}
						/>
						<SelectField
							label="Programming Language"
							options={programmingLanguages}
							registration={register('language')}
						/>
						<div>
							<button className="btn">
								{isLoggingIn ? (
									<span className="loading loading-spinner"></span>
								) : null}
								loading
							</button>
						</div>
					</>
				)}
			</Form>
		</div>
	);
};
