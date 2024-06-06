import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { rupee } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const filterDataByMonth = (data, month) => {
    return data.filter((item) => new Date(item.date).getMonth() === month);
  };

  const filteredIncomes = filterDataByMonth(incomes, selectedMonth);
  const filteredExpenses = filterDataByMonth(expenses, selectedMonth);

  const totalIncomeForMonth = filteredIncomes.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  const totalExpensesForMonth = filteredExpenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  const totalBalanceForMonth = totalIncomeForMonth - totalExpensesForMonth;

  const minIncome = Math.min(...filteredIncomes.map((item) => item.amount));
  const maxIncome = Math.max(...filteredIncomes.map((item) => item.amount));
  const minExpense = Math.min(...filteredExpenses.map((item) => item.amount));
  const maxExpense = Math.max(...filteredExpenses.map((item) => item.amount));

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart data={filteredExpenses} />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {rupee} {totalIncomeForMonth.toFixed(2)}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {rupee} {totalExpensesForMonth.toFixed(2)}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {rupee} {totalBalanceForMonth.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <div className="month-select">
                <label htmlFor="month">Select Month:</label>
                <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                    {Array.from({ length: 12}).map((_, index) => (
                        <option key={index} value={index}>
                            {new Date(0, index).toLocaleDateString('default', {month: 'long'})}
                        </option>
                    ))}
                </select>
            </div>
            <h2 className="salary-title">
              Min <span>Income</span>Max
            </h2>
            <div className="salary-item">
              <p>
                {rupee}
                {minIncome.toFixed(2)}
              </p>
              <p>
                {rupee}
                {maxIncome.toFixed(2)}
              </p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>
                {rupee}
                {minExpense.toFixed(2)}
              </p>
              <p>
                {rupee}
                {maxExpense.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-con {
      grid-column: 1 / 4;
      height: 400px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 2.5rem;
            font-weight: 700;
          }
        }
        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 10px;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 2.5rem;
          }
        }
      }
    }
    .history-con {
      grid-column: 4 / -1;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
  .month-select {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    label {
      margin-right: 1rem;
    }
    select {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
`;

export default Dashboard;
