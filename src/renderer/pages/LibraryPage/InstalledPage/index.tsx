import { messages } from "common/butlerd";
import { GameClassification } from "common/butlerd/messages";
import { Dispatch } from "common/types";
import { ambientTab } from "common/util/navigation";
import React from "react";
import { hookWithProps } from "renderer/hocs/hook";
import { withTab } from "renderer/hocs/withTab";
import { FilterGroupGameClassification } from "renderer/pages/common/CommonFilters";
import GameSeries from "renderer/pages/common/GameSeries";
import SearchControl from "renderer/pages/common/SearchControl";
import { SortOption } from "renderer/pages/common/Sort";
import {
  FilterGroup,
  FilterOptionIcon,
  FilterOptionLink,
  FilterSpacer,
  SortsAndFilters,
} from "renderer/pages/common/SortsAndFilters";
import StandardMainAction from "renderer/pages/common/StandardMainAction";
import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
import { T } from "renderer/t";

const CaveGameSeries = GameSeries(messages.FetchCaves);

class InstalledPage extends React.PureComponent<Props> {
  render() {
    const { sortBy, sortDir, classification } = this.props;

    return (
      <CaveGameSeries
        label={["sidebar.installed"]}
        params={{
          sortBy,
          reverse: sortDir === "reverse",
          filters: { classification },
        }}
        getGame={cave => cave.game}
        getKey={cave => cave.id}
        renderItemExtras={cave => <StandardMainAction game={cave.game} />}
        renderMainFilters={() => <SearchControl />}
        renderExtraFilters={() => (
          <SortsAndFilters>
            <FilterGroup>
              <SortOption sortBy="title" label={["sort_by.games.title"]} />
            </FilterGroup>
            <FilterSpacer />
            <FilterGroupGameClassification />
            <FilterSpacer />
            <FilterGroup>
              <FilterOptionLink href="itch://locations">
                <FilterOptionIcon icon="cog" />
                {T(["install_locations.manage"])}
              </FilterOptionLink>
            </FilterGroup>
          </SortsAndFilters>
        )}
      />
    );
  }
}

interface Props extends MeatProps {
  tab: string;
  dispatch: Dispatch;

  sortBy: string;
  sortDir: string;
  classification: GameClassification;
}

export default withTab(
  hookWithProps(InstalledPage)(map => ({
    sortBy: map((rs, props) => ambientTab(rs, props).location.query.sortBy),
    sortDir: map((rs, props) => ambientTab(rs, props).location.query.sortDir),
    classification: map(
      (rs, props) =>
        ambientTab(rs, props).location.query
          .classification as GameClassification
    ),
  }))(InstalledPage)
);
