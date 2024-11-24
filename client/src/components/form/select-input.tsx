import clsx from 'clsx';
import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import {
	FieldWrapper,
	FieldWrapperPassThroughProps,
} from './field-wrapper.tsx';

type Option = {
	label: React.ReactNode;
	value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
	options: Option[];
	className?: string;
	defaultValue?: string;
	placeholder?: string;
	registration: Partial<UseFormRegisterReturn>;
};

export const SelectField = (props: SelectFieldProps) => {
	const { label, options, error, className, defaultValue, registration } =
		props;
	return (
		<FieldWrapper label={label} error={error}>
			<select
				name="location"
				className={clsx(
					'mt-1 block w-full rounded-md border-gray-600 py-2 pl-3 pr-10 text-base text-black focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm',
					className,
				)}
				defaultValue={defaultValue}
				{...registration}
			>
				{options.map(({ label, value }) => (
					<option key={label?.toString()} value={value}>
						{label}
					</option>
				))}
			</select>
		</FieldWrapper>
	);
};
