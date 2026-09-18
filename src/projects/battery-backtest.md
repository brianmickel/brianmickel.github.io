---
title: Battery arbitrage backtest
date: 2026-01-28
topics: [energy]
repo: https://github.com/brianmickel/battery-backtest
summary: Would a grid battery pay for itself on price arbitrage alone? In CAISO, not for about 150 years.
---

A backtesting engine for battery trading strategies. Given a historical LMP price series for a node, it simulates a battery's charge and discharge decisions under the system's constraints and reports profit and utilization. Go on the back end, React and Recharts on the front, market data from the Grid Status API.

## What I learned

Before this project I was adamant that battery energy storage is now cheap enough to be the future: we can solve the misalignment between generation and demand with short-term storage, and private equity would flood the market with installations to arbitrage the gap between midday and the evening ramp.

I still believe batteries are the future, but I now understand that the payoff for simple arbitrage within CAISO would take hundreds of years. Texas's ERCOT may be volatile enough to pay off sooner. Batteries make much more money keeping the voltage up: coal and gas provide inertia with spinning metal, solar doesn't, and batteries earn on that sub-second voltage maintenance rather than on the daily spread.

I knew Hornsdale in Australia cost around $150M and paid for itself within two years. I now know that wasn't simply arbitrage. We're also watching the spread shrink as more batteries join the grid.

## Two runs

**Moss Landing.** One day of dispatch: charged 2,553 MWh from the grid between 11:00 and 14:25, discharged 2,256 MWh between 16:00 and 19:05, for a PnL of $17,992. Annualised that's about $6.6M/yr against an estimated $1B cost, a payoff of roughly 154 years.

**A 100 MW battery near Flagstaff.** Charged 63 MWh, discharged 57 MWh, PnL $469 for the day. About $171k/yr against $30M, a payoff of roughly 171 years.

```
$ go run ./cmd/cli backtest --data sample_data2.json \
    --config examples/schedule_config.yaml --out results/dispatch.csv --n 288
Total PnL=$17992.22 Final SOC=0.100
Backtest window: 2026-01-18 00:00 → 2026-01-19 00:00
```

A number worth remembering: roughly $300k per MWh installed.
