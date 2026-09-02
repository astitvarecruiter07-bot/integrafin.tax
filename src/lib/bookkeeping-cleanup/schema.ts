import { z } from 'zod';
import {
  complexityValues,
  deadlineTypeValues,
  deadlineWindowValues,
  financialAccountValues,
  mixedExpenseValues,
  monthlyTransactionValues,
  monthsBehindValues,
  payrollValues,
  reconciliationValues,
  softwareValues,
} from './types';

export const BookkeepingAssessmentAnswersSchema = z.strictObject({
  software: z.enum(softwareValues),
  monthsBehind: z.enum(monthsBehindValues),
  monthlyTransactions: z.enum(monthlyTransactionValues),
  financialAccounts: z.enum(financialAccountValues),
  reconciliationStatus: z.enum(reconciliationValues),
  payrollStatus: z.enum(payrollValues),
  mixedPersonalExpenses: z.enum(mixedExpenseValues),
  complexities: z.array(z.enum(complexityValues)).min(1).max(6).superRefine((values, context) => {
    if (new Set(values).size !== values.length) {
      context.addIssue({ code: 'custom', message: 'Complexity choices must be unique.' });
    }
    if (values.includes('none') && values.length > 1) {
      context.addIssue({ code: 'custom', message: 'None of these cannot be combined with another choice.' });
    }
    if (values.includes('unsure') && values.length > 1) {
      context.addIssue({ code: 'custom', message: 'Not sure cannot be combined with another choice.' });
    }
  }),
  deadlineWindow: z.enum(deadlineWindowValues),
  deadlineType: z.enum(deadlineTypeValues).optional(),
}).superRefine((answers, context) => {
  if (answers.deadlineWindow === 'none' && answers.deadlineType) {
    context.addIssue({ code: 'custom', path: ['deadlineType'], message: 'A deadline type requires an active deadline.' });
  }
});
