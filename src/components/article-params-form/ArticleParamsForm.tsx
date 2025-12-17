import { useState, useRef, useLayoutEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import type { OptionType } from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] = useState({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	const toggleForm = () => {
		setIsOpen(!isOpen);
	};

	const handleFieldChange =
		(field: keyof typeof formState) => (value: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[field]: value,
			}));
		};

	useLayoutEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			{isOpen && (
				<aside
					ref={formRef}
					className={`${styles.container} ${styles.container_open}`}>
					<form className={styles.form}>
						<div className={styles.header}>
							<Text size={31} weight={800} uppercase>
								ЗАДАЙТЕ ПАРАМЕТРЫ
							</Text>
						</div>
						{/* 1. шрифт */}
						<div className={styles.formSection}>
							<Select
								selected={formState.fontFamily}
								options={fontFamilyOptions}
								onChange={handleFieldChange('fontFamily')}
								title='Шрифт'
							/>
						</div>
						{/* 2. размер текста*/}
						<div className={styles.formSection}>
							<RadioGroup
								name='font-size'
								selected={formState.fontSize}
								options={fontSizeOptions}
								onChange={handleFieldChange('fontFamily')}
								title='Размер шрифта'
							/>
						</div>
						{/* 3. цвет текста */}
						<div className={styles.formSection}>
							<Select
								selected={formState.fontColor}
								options={fontColors}
								onChange={handleFieldChange('fontColor')}
								title='Цвет шрифта'
							/>
						</div>
						<div className={styles.separatorWrapper}>
							<Separator />
						</div>
						{/* 4. фон */}
						<div className={styles.formSection}>
							<Select
								selected={formState.backgroundColor}
								options={backgroundColors}
								onChange={handleFieldChange('backgroundColor')}
								title='Цвет фона'
							/>
						</div>
						{/* 5. ширина */}
						<div className={styles.formSection}>
							<Select
								selected={formState.contentWidth}
								options={contentWidthArr}
								onChange={handleFieldChange('contentWidth')}
								title='Ширина контента'
							/>
						</div>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
