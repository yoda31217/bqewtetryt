package models.event;

import java.util.List;

import static java.util.Arrays.asList;

public enum Sport {
  UNKNOWN("UK", asList("unknown")),
  TENNIS("TE", asList("tennis")),
  BASEBALL("BL", asList("baseball")),
  VOLLEYBALL("VB", asList("volleyball")),
  TABLE_TENNIS("TT", asList("table", "tennis")),
  BASKETBALL("BB", asList("basketball"));

  public final  String       label;
  private final List<String> engNameParts;

  Sport(String label, List<String> engNameParts) {
    this.label = label;
    this.engNameParts = engNameParts;
  }

  public static Sport sportFromEngName(String unknownSportEngName) {
    if (null == unknownSportEngName) return UNKNOWN;

    unknownSportEngName = unknownSportEngName.toLowerCase();

    for (Sport sportCandidate : values())
      if (isCandidateEqualToUnknownSport(unknownSportEngName, sportCandidate)) return sportCandidate;

    return UNKNOWN;
  }

  private static boolean isCandidateEqualToUnknownSport(String unknownSportEngName, Sport sportCandidate) {
    for (String sportCandidateEngNamePart : sportCandidate.engNameParts)
      if (!unknownSportEngName.contains(sportCandidateEngNamePart)) return false;

    return true;
  }
}
